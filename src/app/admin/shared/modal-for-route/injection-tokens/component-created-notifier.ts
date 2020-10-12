import {InjectionToken} from '@angular/core';
import {Subject} from 'rxjs';

export const COMPONENT_CREATED_NOTIFIER = new InjectionToken<Subject<boolean>>('Component created notifier');
