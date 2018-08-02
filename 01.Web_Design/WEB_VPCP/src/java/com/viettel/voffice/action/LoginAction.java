package com.viettel.voffice.action;

import com.viettel.voffice.web.library.basecore.CoreLibWebCommon;
import com.viettel.voffice.web.library.basecore.entity.CoreDataResponseEntity;
import java.util.LinkedHashMap;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.Executions;
import org.zkoss.zk.ui.Sessions;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zk.ui.select.annotation.Listen;
import org.zkoss.zk.ui.select.annotation.Wire;
import org.zkoss.zul.Label;
import org.zkoss.zul.Textbox;


public class LoginAction extends SelectorComposer {
    @Wire
    private Textbox userNameTV;
    @Wire
    private Textbox userPass;
    @Wire
    private Label mesg;
    @Override
    public final void doAfterCompose(Component comp) throws Exception {
        super.doAfterCompose(comp);
    } 
    @Listen("onOK = window#loginWin")
    public void onOK() {
       loginService(userNameTV.getValue() ,userPass.getValue());
    }
    
    @Listen("onClick = button#login")
    public void login() {
        loginService(userNameTV.getValue() ,userPass.getValue());
    }

    
    
    
    /**
     * goi service dang nhap
     * @param userName
     * @param passWord 
     */
    private void loginService(String userName, String passWord) {
        CoreLibWebCommon libWebCommon = new CoreLibWebCommon();
        Map<String, Object> params = new LinkedHashMap<>();
        params.put("userName", userName);
        params.put("passWord", passWord);
        CoreDataResponseEntity coreDataResponseEntity = 
                libWebCommon.requestDataToServer("Authen.login", params, null);
        System.out.println(coreDataResponseEntity.getData());
        if(coreDataResponseEntity.getMess().getMessCode() == 1 
            ||coreDataResponseEntity.getMess().getMessCode() == 200){
            //lay thong tin ca nhan dang nhap
//            String jsonDataUser = coreDataResponseEntity.getData();
//            SysUserEntity sysUserEntity = (SysUserEntity) FunctionCommon.convertJsonToObject(
//                    jsonDataUser, SysUserEntity.class);
//            
            HttpSession session = (HttpSession)(
                    Executions.getCurrent()).getDesktop().getSession().getNativeSession();
            params.put("userName", userName);
            params.put("passWord", passWord);
           
            Sessions.getCurrent().setAttribute(session.getId(), coreDataResponseEntity); 
           
            Executions.sendRedirect("/pages/main.zul");
        }else{
            if(coreDataResponseEntity.getMess().getMessCode() == -1580){
                mesg.setValue("Lỗi đăng nhập");
            }else{
                mesg.setValue("Lỗi Service: " + coreDataResponseEntity.getMess().getMessDetail());
            }
        }
    }
    public static void main(String[] args) {
        LoginAction s=new LoginAction();
       // s.loginService("admin","123");
        System.out.println("hhjbhj");
        s.loginService("admin","123");
    }
}
