<?php

namespace App\Enums;

enum Category: string
{
    case COMPUTING = 'Computing';
    case ENGINEERING = 'Engineering';
    case MANAGEMENT = 'Management';
    case GEOSCIENCES = 'GeoSciences';
    case ENVIRONMENTAL = 'Environmental';

    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }

    public static function options(): array
    {
        return array_map(fn($case) => [
            'value' => $case->value,
            'label' => $case->value
        ], self::cases());
    }
}