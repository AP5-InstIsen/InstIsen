<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Models\UserNote;
use Auth;
use Illuminate\Http\Request;

class UserNoteController extends Controller
{
    public function store(Request $request)
    {
        $user = Auth::guard('api')->user();
        $request->validate([
                    'idImage' => 'required|integer',
                    'note' => 'required|numeric',
                ]);
        $userNote = UserNote::create([
                        'idUser' => $user->id,
                        'idImage' => $request->idImage,
                        'note' => $request->note
                    ]);

        $image = Image::find($request->idImage);
        $image->note = ($image->note == null) ? $request->note : ($image->note + $request->note)/2;
        $image->save();

        return response(['userNote' => $userNote,'message' => 'the note was updated successfully']);
    }
}
