import { Language } from '../../models/configs/language-options.model';
import { IUser } from '../../models/interfaces/user.model.i';

export namespace AuthActions {

    export class UserLogin {
        static readonly type = '[User] login';

        constructor(public readonly payload?: Partial<IUser>) {
        }
    }

    export class UserLogout {
        static readonly type = '[User] logout';
    }

    export class UserRegister {
        static readonly type = '[User] register';

        constructor(public readonly payload: Partial<IUser>) {
        }
    }

    export class UserAuthError {
        static readonly type = '[User] auth error';

        constructor(public readonly payload: string) {
        }
    }

    export class UserChangeLanguage {
        static readonly type = '[User] change language';

        constructor(public readonly payload: Language) {
        }
    }
}
