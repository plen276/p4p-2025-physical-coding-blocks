import { NextRequest, NextResponse } from 'next/server';
import { commandQueue } from '../pico/route';

// GET /api/robot - mBot2 polls for commands
export async function GET(request: NextRequest) {
  try {
    const url = new URL(request.url);
    const robotId = url.searchParams.get('robotId') || 'default';
    const action = url.searchParams.get('action') || 'get';

    if (action === 'get') {
      // Get next pending command
      const pendingCommand = commandQueue.find(cmd => cmd.status === 'pending');
      
      if (!pendingCommand) {
        return NextResponse.json({
          success: true,
          hasCommand: false,
          message: 'No commands available'
        });
      }

      // Mark command as processing
      pendingCommand.status = 'processing';
      pendingCommand.timestamp = Date.now(); // Update timestamp

      console.log(`[ROBOT] Sending command to robot ${robotId}: ${pendingCommand.type} (ID: ${pendingCommand.id})`);

      return NextResponse.json({
        success: true,
        hasCommand: true,
        command: {
          id: pendingCommand.id,
          type: pendingCommand.type,
          data: pendingCommand.data
        }
      });
    }

    if (action === 'complete') {
      // Mark command as completed
      const commandId = url.searchParams.get('commandId');
      if (!commandId) {
        return NextResponse.json(
          { error: 'commandId is required for complete action' },
          { status: 400 }
        );
      }

      const command = commandQueue.find(cmd => cmd.id === commandId);
      if (!command) {
        return NextResponse.json(
          { error: 'Command not found' },
          { status: 404 }
        );
      }

      command.status = 'completed';
      console.log(`[ROBOT] Command completed: ${commandId}`);

      return NextResponse.json({
        success: true,
        message: 'Command marked as completed'
      });
    }

    if (action === 'fail') {
      // Mark command as failed
      const commandId = url.searchParams.get('commandId');
      if (!commandId) {
        return NextResponse.json(
          { error: 'commandId is required for fail action' },
          { status: 400 }
        );
      }

      const command = commandQueue.find(cmd => cmd.id === commandId);
      if (!command) {
        return NextResponse.json(
          { error: 'Command not found' },
          { status: 404 }
        );
      }

      command.status = 'failed';
      console.log(`[ROBOT] Command failed: ${commandId}`);

      return NextResponse.json({
        success: true,
        message: 'Command marked as failed'
      });
    }

    if (action === 'status') {
      // Get queue status
      const pendingCount = commandQueue.filter(cmd => cmd.status === 'pending').length;
      const processingCount = commandQueue.filter(cmd => cmd.status === 'processing').length;
      const completedCount = commandQueue.filter(cmd => cmd.status === 'completed').length;
      const failedCount = commandQueue.filter(cmd => cmd.status === 'failed').length;

      return NextResponse.json({
        success: true,
        status: {
          total: commandQueue.length,
          pending: pendingCount,
          processing: processingCount,
          completed: completedCount,
          failed: failedCount
        }
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use: get, complete, fail, or status' },
      { status: 400 }
    );

  } catch (error) {
    console.error('[ROBOT] Error processing request:', error);
    return NextResponse.json(
      { error: 'Server error' },
      { status: 500 }
    );
  }
}

// POST /api/robot - Alternative endpoint for command completion and robot registration
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action, commandId, robotId, macAddress } = body;

    if (action === 'complete' || action === 'fail') {
      if (!commandId) {
        return NextResponse.json(
          { error: 'commandId is required' },
          { status: 400 }
        );
      }

      const command = commandQueue.find(cmd => cmd.id === commandId);
      if (!command) {
        return NextResponse.json(
          { error: 'Command not found' },
          { status: 404 }
        );
      }

      command.status = action === 'complete' ? 'completed' : 'failed';
      console.log(`[ROBOT] Command ${action}d: ${commandId} by robot ${robotId || 'unknown'}`);

      return NextResponse.json({
        success: true,
        message: `Command ${action}d successfully`
      });
    }

    if (action === 'register') {
      // Register robot with MAC address
      if (!macAddress) {
        return NextResponse.json(
          { error: 'macAddress is required for registration' },
          { status: 400 }
        );
      }

      console.log(`[ROBOT] Robot registered: ${robotId || 'unknown'} (MAC: ${macAddress})`);
      
      return NextResponse.json({
        success: true,
        message: 'Robot registered successfully',
        robotId: robotId || 'unknown',
        macAddress: macAddress
      });
    }

    return NextResponse.json(
      { error: 'Invalid action. Use: complete, fail, or register' },
      { status: 400 }
    );

  } catch (error) {
    console.error('[ROBOT] Error processing POST request:', error);
    return NextResponse.json(
      { error: 'Invalid JSON or server error' },
      { status: 500 }
    );
  }
}
