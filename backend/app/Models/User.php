<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'organization_id',
        'is_active',
        'institution',
        'specialization',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'is_active' => 'boolean',
        ];
    }

    public function organization()
    {
        return $this->belongsTo(Organization::class);
    }

    public function documents()
    {
        return $this->hasMany(Document::class, 'uploaded_by');
    }

    public function approvals()
    {
        return $this->hasMany(DocumentApproval::class, 'admin_id');
    }

    public function isSuperAdmin(): bool
    {
        return $this->role === 'super_admin';
    }

    public function isOrgAdmin(): bool
    {
        return $this->role === 'org_admin';
    }

    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    public function isContributor(): bool
    {
        return $this->role === 'contributor';
    }

    public function isAcademic(): bool
    {
        return $this->role === 'academic';
    }

    public function canManageOrganization(): bool
    {
        return in_array($this->role, ['super_admin', 'org_admin']);
    }

    public function canManageUsers(): bool
    {
        return in_array($this->role, ['super_admin', 'org_admin', 'admin']);
    }

    public function canUploadDocuments(): bool
    {
        return in_array($this->role, ['super_admin', 'org_admin', 'admin', 'contributor', 'academic']);
    }

    public function canApproveDocuments(): bool
    {
        return in_array($this->role, ['admin', 'academic']);
    }
}
