import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/lib/auth";

interface Params {
  params: { id: string };
}

// GET — Fetch collaborator profile by userId
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const collaborator = await prisma.collaboratorProfile.findUnique({
      where: { userId: params.id },
      include: {
        user: {
          select: {
            name: true,
            image: true,
            bio: true,
            location: true,
          },
        },
      },
    });

    if (!collaborator) {
      return NextResponse.json({ error: 'Collaborator not found' }, { status: 404 });
    }

    return NextResponse.json(collaborator);
  } catch (error) {
    console.error('Error fetching collaborator:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH — Update collaborator profile
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user || user.id !== params.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();

    const updated = await prisma.collaboratorProfile.update({
      where: { userId: params.id },
      data: {
        title: data.title,
        skills: data.skills,
        portfolio: data.portfolio,
        startingPrice: data.startingPrice,
        responseTime: data.responseTime,
        location: data.location,
        // "verified", "topRated", "rating", "reviewsCount" should be updated internally, not here
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating collaborator:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST — Create a collaboration request with this collaborator
export async function POST(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const requester = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!requester) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    // Ensure collaborator exists
    const collaborator = await prisma.collaboratorProfile.findUnique({
      where: { userId: params.id },
    });

    if (!collaborator) {
      return NextResponse.json({ error: 'Collaborator not found' }, { status: 404 });
    }

    // Prevent sending collaboration request to yourself
    if (collaborator.userId === requester.id) {
      return NextResponse.json({ error: 'You cannot collaborate with yourself' }, { status: 400 });
    }

    const body = await request.json();
    const { projectDescription, budget, deadline } = body;

    // Create collaboration record
    const collab = await prisma.collaboration.create({
      data: {
        requesterId: requester.id,
        receiverId: collaborator.userId,
        projectDescription,
        budget: budget ? parseFloat(budget) : undefined,
        deadline: deadline ? new Date(deadline) : undefined,
      },
    });

    return NextResponse.json(collab, { status: 201 });
  } catch (error) {
    console.error('Error creating collaboration:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
