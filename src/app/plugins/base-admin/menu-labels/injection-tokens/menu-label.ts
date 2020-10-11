import {InjectionToken} from '@angular/core';
import {MenuLabel} from '../interfaces/menu-label';

export const MENU_LABELS = new InjectionToken<MenuLabel[]>('menu labels');
