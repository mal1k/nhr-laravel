<?php

namespace App\Http\Controllers;

use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Routing\Controller as BaseController;
use App\Models\User;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests;
    
    public function index() 
    {
        $m = get_class_methods(\App\Models\User::class);

        echo '<pre>';
        dd($m);
    }

    // public function index()
    // {
    //     $attributes = (new User)->getAttributeNames();
    //     $users = User::offset(0)->limit(10)->get();
    //     dd($users);
    //     // dd($this->prepareData($attributes, $users));
    // }

    // protected function prepareData(array $attributes, array $users) : array
    // {
    //     $newAttributes = [];
    //     $newUsers = [];
        
    //     foreach ($attributes as $attribute) {
    //         $newAttributes[] = ['name' => $attribute];
    //     }
        
    //     foreach ($users as $user) {
    //         $newUsers[] = [
    //             'id' => $user->id,
    //             'name' => $user->name,
    //             'email' => $user->email,
    //             'password' => '',
    //         ];
    //     }

    //     return [
    //         'attributes' => $newAttributes,
    //         'items' => $newUsers,
    //     ];
    // }
}
