<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class EventController extends Controller
{
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'start_time' => 'required|date',
            'end_time' => 'required|date|after:start_time',
            'participants' => 'nullable|array',
            'participants.*' => 'exists:users,id',
        ]);

        $event = Event::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'start_time' => $validated['start_time'],
            'end_time' => $validated['end_time'],
            'user_id' => Auth::id(),
        ]);

        if (isset($validated['participants'])) {
            $event->participants()->sync($validated['participants']);
        }

        return response()->json(['message' => 'Event created successfully', 'data' => $event], 201);
    }
}
