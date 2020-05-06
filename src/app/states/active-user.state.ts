import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Language } from '../models/language-options.model';
import { IUser } from '../models/interfaces/user.model.i';
import { AuthService } from '../services/auth-service/auth.service';
import { AuthActions } from './actions/active-user.actions';

export interface IActiveUserStateModel {
    user?: IUser;
    isLoggedIn: boolean;
    language: Language;
    authError?: string;
}

@State<IActiveUserStateModel>({
    name: 'activeUser',
    defaults: {
        isLoggedIn: false,
        language: Language.EN
    }
})
@Injectable()
export class ActiveUserState {
    constructor(
        private readonly _authService: AuthService,
        private readonly _router: Router,
        private readonly _ngZone: NgZone,
    ) {
    }

    @Selector()
    static isLoggedIn(state: IActiveUserStateModel): boolean {
        return state.isLoggedIn;
    }

    @Selector()
    static authError(state: IActiveUserStateModel): string {
        return state.authError;
    }

    @Selector()
    static language(state: IActiveUserStateModel): Language {
        return state.language;
    }

    @Action(AuthActions.UserAuthError)
    userErrors({ patchState }: StateContext<IActiveUserStateModel>,
               { payload }: AuthActions.UserAuthError): void {
        patchState({
            authError: payload
        });
    }

    @Action(AuthActions.UserRegister)
    async userRegister({ dispatch, patchState }: StateContext<IActiveUserStateModel>,
                       { payload }: AuthActions.UserRegister) {
        const result: boolean = await this._authService.register(payload);
        if (result) {
            dispatch(new AuthActions.UserLogin(payload));
        } else {
            patchState({
                authError: 'LOGIN.ERRORS.AUTH.REGISTERED'
            });
        }
    }


    @Action(AuthActions.UserLogin)
    async userLogin({ patchState }: StateContext<IActiveUserStateModel>,
                    { payload }: AuthActions.UserLogin): Promise<void> {
        const user: IUser = await this._authService.login(payload);
        if (!user) {
            patchState({
                authError: 'LOGIN.ERRORS.AUTH.WRONG_INPUT'
            });
        } else {
            patchState({
                user,
                isLoggedIn: true,
                authError: '',
                language: user.language
            });

            this.navigateTo('/chat');
        }
    }

    @Action(AuthActions.UserLogout)
    async userLogout({ patchState }: StateContext<IActiveUserStateModel>): Promise<void> {
        await this._authService.logout();
        patchState({
            user: null,
            isLoggedIn: false
        });
        this.navigateTo('');
    }

    @Action(AuthActions.UserChangeLanguage)
    async userChangeLanguage({ patchState, getState }: StateContext<IActiveUserStateModel>,
                             { payload }: AuthActions.UserChangeLanguage): Promise<void> {
        const state: IActiveUserStateModel = getState();
        if (state.isLoggedIn) {
            await this._authService.changeLanguage(payload);
        }
        patchState({
            language: payload
        });
    }

    private navigateTo(item): void {
        this._ngZone.run(() => {
                this._router.navigate([item]);
            }
        );
    }

}
