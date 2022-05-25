export interface User {
    uid: string;
    email: string;
    password:string;
    ccid:number;
    emailVerified:boolean;
  }

  export interface Movements {
    creationDate?: string; //Angular necesita este campo.
    isActive: boolean;
    isDone: boolean;
    isPending: boolean;
    isTaken: boolean;
    position: string;
    positionSetString: string;
    uiserId: string;
  }