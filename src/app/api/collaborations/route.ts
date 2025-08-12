import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';

// GET — List collaborations for logged-in user
export async function GET(request: NextRequest) {
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

    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status'); // optional filter
    const role = searchParams.get('role');     // optional filter: "requester" | "receiver"

    let whereClause: any = {};

    if (role === 'requester') {
      whereClause.requesterId = user.id;
    } else if (role === 'receiver') {
      whereClause.receiverId = user.id;
    } else {
      // Default: show both sent and received collaborations
      whereClause.OR = [
        { requesterId: user.id },
        { receiverId: user.id },
      ];
    }

    if (status) {
      whereClause.status = status as any;
    }

    const collaborations = await prisma.collaboration.findMany({
      where: whereClause,
      include: {
        requester: { select: { id: true, name: true, image: true } },
        receiver: { select: { id: true, name: true, image: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json(collaborations);
  } catch (error) {
    console.error('Error fetching collaborations:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
