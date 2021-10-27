import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import {
  selectEffectiveTheme,
  selectIsAuthenticated,
  selectSettingsLanguage,
  selectSettingsStickyHeader
} from '../core/core.module';

import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let store: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        TranslateModule.forRoot()
      ],
      providers: [provideMockStore()],
      declarations: [AppComponent]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    store.overrideSelector(selectIsAuthenticated, false);
    store.overrideSelector(selectSettingsStickyHeader, false);
    store.overrideSelector(selectSettingsLanguage, 'fr');
    store.overrideSelector(selectEffectiveTheme, 'default');
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
