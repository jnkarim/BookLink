<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BooksTableSeeder extends Seeder
{
    public function run()
    {
        DB::statement("
            INSERT INTO books (title, author, description, cover_image, status, user_id) 
            VALUES 
            ('The Alchemist', 'Paulo Coelho', 'A novel about a journey.', 'cover1.jpg', 'available', 1),
            ('1984', 'George Orwell', 'A dystopian novel about totalitarianism.', 'cover2.jpg', 'borrowed', 1),
            ('To Kill a Mockingbird', 'Harper Lee', 'A novel about racial injustice in the American South.', 'cover3.jpg', 'available', 1),
            ('The Great Gatsby', 'F. Scott Fitzgerald', 'A story of wealth, love, and the American Dream.', 'cover4.jpg', 'available', 1),
            ('Moby', 'Herman Melville', 'A tale of obsession and revenge.', 'cover5.jpg', 'borrowed', 1),
            ('Pride and Prejudice', 'Jane Austen', 'A romantic novel about manners and marriage.', 'cover6.jpg', 'available', 1),
            ('Sherlock Holmes', 'Arthur Conan Doyale', 'A detective novel', 'cover7.jpg', 'available', 2)
        ");
    }
}
