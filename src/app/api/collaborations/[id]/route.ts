import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

interface Params {
  params: { id: string };
}

// GET — Fetch collaboration by id
export async function GET(request: NextRequest, { params }: Params) {
  try {
    const collaboration = await prisma.collaboration.findUnique({
      where: { id: params.id },
      include: {
        requester: {
          select: { id: true, name: true, image: true },
        },
        receiver: {
          select: { id: true, name: true, image: true },
        },
      },
    });

    if (!collaboration) {
      return NextResponse.json({ error: 'Collaboration not found' }, { status: 404 });
    }

    return NextResponse.json(collaboration);
  } catch (error) {
    console.error('Error fetching collaboration:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PATCH — Update status/details
export async function PATCH(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const collaboration = await prisma.collaboration.findUnique({
      where: { id: params.id },
    });
    if (!collaboration) {
      return NextResponse.json({ error: 'Collaboration not found' }, { status: 404 });
    }

    const body = await request.json();
    const { status, projectDescription, budget, deadline } = body;

    // Rules for status updates
    const allowedToChangeStatus =
      (status && collaboration.receiverId === user.id) || // Receiver can accept/decline
      (status && collaboration.requesterId === user.id && status === 'cancelled'); // Requester can cancel

    const allowedToEditDetails =
      collaboration.requesterId === user.id && !status; // Only requester can change details

    if (!allowedToChangeStatus && !allowedToEditDetails) {
      return NextResponse.json({ error: 'Not authorized to update this collaboration' }, { status: 403 });
    }

    const updated = await prisma.collaboration.update({
      where: { id: params.id },
      data: {
        ...(status ? { status } : {}),
        ...(allowedToEditDetails
          ? {
              projectDescription,
              budget: budget ? parseFloat(budget) : undefined,
              deadline: deadline ? new Date(deadline) : undefined,
            }
          : {}),
      },
    });

    return NextResponse.json(updated);
  } catch (error) {
    console.error('Error updating collaboration:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// DELETE — Cancel collaboration completely
export async function DELETE(request: NextRequest, { params }: Params) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const collaboration = await prisma.collaboration.findUnique({
      where: { id: params.id },
    });
    if (!collaboration) {
      return NextResponse.json({ error: 'Collaboration not found' }, { status: 404 });
    }

    // Allow delete only if requester or receiver
    if (collaboration.requesterId !== user.id && collaboration.receiverId !== user.id) {
      return NextResponse.json({ error: 'Not authorized to delete this collaboration' }, { status: 403 });
    }

    await prisma.collaboration.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: 'Collaboration deleted successfully' });
  } catch (error) {
    console.error('Error deleting collaboration:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
