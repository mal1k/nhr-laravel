<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent\Collection;
use App\Models\User;

class UserController extends Controller
{
    public function index()
    {
        $users = User::offset(0)->limit(10)->get();
        return response()->json($users);
    }

    public function edit(Request $request)
    {
        $id = $request->post('user-id');
        $user = User::find($id);

        return response()->json($user);
    }
}
