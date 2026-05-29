import { CommonModule } from '@angular/common';
import { TranslatePipe } from './translate.pipe';

/** Shared standalone imports for templates using the translate pipe */
export const SHARED_UI_IMPORTS = [CommonModule, TranslatePipe] as const;
