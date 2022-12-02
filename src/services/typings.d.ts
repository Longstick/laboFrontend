declare namespace API {

  type LoginParams = {
    account?: string;
    password?: string;
    autoLogin?: boolean;
    type?: string;
  };

  type PostResult = {
    code?: number;
    data?: any;
    msg?: string;
  }

  type SignupParams = {
    account?: string;
    username?: string;
    phone?: string;
    email?: string;
    code?: string;
    password?: string;
  }

  type UserInfo = {
    account?: string;
    username?: string;
    phone?: string;
    email?: string;
    identity?: number;
    character?: string;
    auth?: number;
    id?: string;
    isRepair?: number;
    isDispatch?: number;
    isExamine?: number;
    isAccept?: number;
    systemManage?: number;
    equipManage?: number;
  }

  // declare type Status = 'error' | 'process' | 'finish' | 'wait';
  type TableColumns = {
    key?: number;
    issueID?: number;
    issueTitle?: string;
    issueDescription?: string;
    category?: any;
    priority: string;
    remainingTime: number;
    estimatedTime: number;
    updatedTime: number;
    status: number;
    object?: string;
    failureType?: string;
    manufacturer?: string;
    picture?: string[];
    trackingNumber?: string;
    currentProcesser?: number;
    processDetails?: {
      stage?: number;
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
        approach?: number
        result?: string;
        comments?: string;
      };
      post?: {
        status?: Status;
        processerID?: number;
        trackingNumber?: string;
        deliveryComp?: string;
        senderPhone?: string;
        sender?: string;
        picture?: string[];
      }
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
  
  type IssueInfo = {
    id: string;
    identifier: string;
    title?: string;
    description?: string;
    resource?: ResourceInfo;
    manufacturer?: string;
    priority: number;
    images?: string[];
    type?: string;
    finish_date?: string;
    create_person?: string;
    has_person: string[];
    status?: number;
    create_time?: string;
    orderNodes?: OrderNode[];
  };

  type OrderNode = {
    id?: string;
    user_id?: string;
    now_user?: {
      id?: string;
      username?: string;
      phone?: string;
    };
    next_charger?: string;
    current_stage?: number;
    remark?: string;
    repair_manufacturer?: string;
    handle_method?: string;
    repair_method?: string;
    logistics_num?: string;
    status?: number;
    reason?: string;
    phone?: string;
    solution?: string;
    score?: number;
    accept_images?: string[];
    update_time?: string;
    orderId?: string;
    opinion?: string;
  };

  type ProcesserInfo = {
    id: string;
    username: string;
    password?: string;
    phone: string;
    email: string;
    identity: number;
    auth: number;
    isRepair: number;
    isDispatch: number;
    isExamine: number;
    isAccept: number;
    systemManage: number;
    equipManage: number;
  };

  type ResourceInfo = {
    id: string;
    identifier: string;
    name: string;
    storagePlace: string;
    minServiceYear: number;
    modelNumber: number;
    remark: any;
    supplier: string;
    usedYear: string;
    indate: string;
    originalValue: number;
    presentSituation: string;
    collectUnit: string;
    type: string;
    specifications: string;
    collectPerson: string;
  }

  type TrackingInfo = {
      trackingNumber?: string,
      deliveryCompany?: string,
      shippingAddress?: string,
      senderPhone?: string,
      sender?: string
  }

  type UserTableColumnsType = {
    userid: number;
    name?: string;
    ID?: string;
    phoneNumber?: string;
    email?: string;
    character?: number;
    authGroup: string[];
  };

  type CharacterInfo = {
    charID: number;
    charName?: string;
    charDesc?: string;
    createUserID?: string;
    createUserPhone?: string;
    authGroup: string[];
  }
}

  