<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Document extends Model
{
    protected $fillable = [
        'title',
        'description',
        'category',
        'author',
        'institution',
        'type',
        'year',
        'keywords',
        'file_name',
        'file_path',
        'file_type',
        'file_size',
        'status',
        'uploaded_by',
        'organization_id',
        'auto_approved',
        'approval_notes'
    ];

    protected $casts = [
        'auto_approved' => 'boolean',
        'keywords' => 'array',
    ];

    public function uploader(): BelongsTo
    {
        return $this->belongsTo(User::class, 'uploaded_by');
    }

    public function organization(): BelongsTo
    {
        return $this->belongsTo(Organization::class);
    }

    public function approvals(): HasMany
    {
        return $this->hasMany(DocumentApproval::class);
    }

    public function approveVotes(): HasMany
    {
        return $this->hasMany(DocumentApproval::class)->where('decision', 'approve');
    }

    public function rejectVotes(): HasMany
    {
        return $this->hasMany(DocumentApproval::class)->where('decision', 'reject');
    }

    // Check if document has enough approvals (7 out of 10)
    public function hasEnoughApprovals(): bool
    {
        return $this->approveVotes()->count() >= 7;
    }

    // Get approval status for this admin
    public function getApprovalStatus($adminId): ?DocumentApproval
    {
        return $this->approvals()->where('admin_id', $adminId)->first();
    }
}
