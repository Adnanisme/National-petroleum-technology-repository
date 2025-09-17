<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Organization extends Model
{
    protected $fillable = [
        'name',
        'short_name',
        'type',
        'description',
        'contact_email',
        'contact_phone',
        'address',
        'website',
        'is_active',
    ];

    protected $casts = [
        'is_active' => 'boolean',
    ];

    public function users(): HasMany
    {
        return $this->hasMany(User::class);
    }

    public function documents(): HasMany
    {
        return $this->hasMany(Document::class);
    }

    public function admins(): HasMany
    {
        return $this->hasMany(User::class)->where('role', 'org_admin');
    }

    public function scopeActive($query)
    {
        return $query->where('is_active', true);
    }
}
