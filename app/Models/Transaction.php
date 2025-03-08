<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    // Ensure the table name is correct
    protected $table = 'transactions';

    protected $fillable = [
        'sender_id',
        'receiver_id',
        'book_id',
        'status'
    ];

    public function sender()
    {
        return $this->belongsTo(User::class, 'sender_id');
    }

    public function receiver()
    {
        return $this->belongsTo(User::class, 'receiver_id');
    }

    public function book()
    {
        return $this->belongsTo(Book::class);
    }
}