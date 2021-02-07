<?php

namespace App\Http\Controllers;

use App\Models\BroadcastList;
use App\Models\User;
use Auth;
use Illuminate\Http\Request;

class BroadcastListController extends Controller
{
    public function store(Request $request)
    {
        if (Auth::guard('api')->check()) {
            $currentUser = Auth::guard('api')->user();
            $validated = $request->validate([
                    'broadcast' => 'string'
            ]);

            $users = User::all()->except($currentUser->id);
            $newBroadcastList = "";
            foreach (explode(',', $request->broadcast) as $userToBroadcast) {
                foreach ($users as $user) {
                    if ($user->id == intval($userToBroadcast)) {
                        if ($newBroadcastList == "") {
                            $newBroadcastList .= $user->id;
                        } else {
                            $newBroadcastList .= ','.$user->id;
                        }
                    }
                }
            }

            $broadcast_list = BroadcastList::create([
                        'idUser' => $currentUser->id,
                        'broadcast' => $newBroadcastList
            ]);

            return response(['broadcast_list' => $broadcast_list, 'message' => 'the broadcast list has been succressfully created']);
        } else {
            return response(['message' => 'you are not logged in']);
        }
    }
}
