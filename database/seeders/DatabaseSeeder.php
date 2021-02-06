<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        User::create([
            'name' => 'Admin',
            'email' => 'admin@admin.admin',
            'password' => Hash::make('admin'),
            'role' => 1
        ]);

        Role::create([
            'name' => 'administrator'
        ]);

        Role::create([
            'name' => 'moderator'
        ]);

        Role::create([
            'name' => 'user'
        ]);

    }
}
