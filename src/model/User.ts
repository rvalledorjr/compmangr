export default class User {
  userName = "";
  password = "";
  private _isAuthenticated = false;

  constructor(objInit?: any) {
    if (!objInit) return;

    this.userName = objInit.userName || "";
    this.password = objInit.password || "";
  }

  authenticate(userName: string, password: string): boolean {
    this._isAuthenticated =
      this.userName === userName && this.password === password;
    return this._isAuthenticated;
  }

  get isAuthenticated(): boolean {
    return this._isAuthenticated;
  }

  get userNameInitial(): string {
    return this.userName.charAt(0).toUpperCase();
  }

  logout() {
    this._isAuthenticated = false;
  }
}
