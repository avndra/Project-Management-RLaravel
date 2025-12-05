<?php

namespace App\Enums;

enum TaskStatus: string
{
    case TO_DO = 'TO_DO';
    case IN_PROGRESS = 'IN_PROGRESS';
    case ON_HOLD = 'ON_HOLD';
    case DONE = 'DONE';
}
