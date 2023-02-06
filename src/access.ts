/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { userInfo?: API.UserInfo } | undefined) {
  const { userInfo } = initialState ?? {};
  
  return {
    canAdmin: userInfo && userInfo.auth! > 1,
    canSystem: userInfo && userInfo.systemManage === 1,
    canEquip: userInfo && userInfo.equipManage === 1
  };
}
