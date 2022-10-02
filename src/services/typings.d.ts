declare namespace API {

  type LoginParams = {
    account?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type LoginResult = {
    code?: number;
    data?: {
      token: string;
      identity: number;
      auth: number;
    };
    msg?: string;
  };

  type UserInfo = {
    account?: string;
    username?: string;
    phone?: string;
    identity?: number;
    auth?: number;
  }

  // declare type Status = 'error' | 'process' | 'finish' | 'wait';
  type TableColumns = {
    key: number;
    issueID: number;
    issueTitle: string;
    issueDescription: string;
    category: any;
    priority: number;
    remainingTime: number;
    estimatedTime: number;
    updatedTime: number;
    status: number;
    object: string;
    failureType: number;
    manufacturer: string;
    picture: string[];
    trackingNumber: string;
    processDetails?: {
      stage: number;
      submit?: {
        status?: Status;
        processerID?: number;
      };
      approval?: {
        status?: Status;
        processerID?: number;
        result?: string;
        comments?: string;
      };
      dispatch?: {
        status?: Status;
        processerID?: number;
        result?: string;
        comments?: string;
      };
      repairment?: {
        status?: Status;
        processerID?: number;
        result?: string;
        cause?: string;
        solution?: string;
        stage?: number;
      };
      acceptance?: {
        status?: Status;
        processerID?: number;
        rating?: number;
        comments?: string;
      };
    };
  };

  type ProcesserInfo = {
    processerID: number;
    processer: string;
    phoneNumber: string;
    updateTime: string;
  };
}
