import { NextRequest, NextResponse } from 'next/server';
import { Command } from '../../types/command';

// In-memory command queue (in production, use Redis or database)
let commandQueue: Command[] = [];

// POST /api/pico - Pico W sends commands here
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    if (!body.type) {
      return NextResponse.json(
        { error: 'Command type is required' },
        { status: 400 }
      );
    }

    // Create new command
    const command: Command = {
      id: `cmd_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type: body.type,
      data: body.data || {},
      timestamp: Date.now(),
      status: 'pending'
    };

    // Add to queue
    commandQueue.push(command);

    console.log(`[PICO] Received command: ${command.type} (ID: ${command.id})`);
    console.log(`[PICO] Queue length: ${commandQueue.length}`);

    return NextResponse.json({
      success: true,
      commandId: command.id,
      queueLength: commandQueue.length
    });

  } catch (error) {
    console.error('[PICO] Error processing command:', error);
    return NextResponse.json(
      { error: 'Invalid JSON or server error' },
      { status: 500 }
    );
  }
}

// GET /api/pico - Get queue status (for debugging)
export async function GET() {
  return NextResponse.json({
    queueLength: commandQueue.length,
    commands: commandQueue.map(cmd => ({
      id: cmd.id,
      type: cmd.type,
      status: cmd.status,
      timestamp: cmd.timestamp
    }))
  });
}

// Export the queue for use in robot route
export { commandQueue };

