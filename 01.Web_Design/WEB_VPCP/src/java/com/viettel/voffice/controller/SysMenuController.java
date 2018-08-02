/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.controller;

import com.viettel.voffice.entity.admin.SysMenuEntity;
import com.viettel.voffice.share.FunctionCommon;
import com.viettel.voffice.web.library.basecore.CoreLibWebCommon;
import com.viettel.voffice.web.library.basecore.entity.CoreDataResponseEntity;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpSession;
import org.zkoss.zk.ui.Executions;
import org.zkoss.zk.ui.Sessions;

/**
 *
 * @author datnv5
 */
public class SysMenuController {
              List<SysMenuEntity> listResult = new ArrayList<SysMenuEntity>();
              public SysMenuController(){
               listResult.add(new SysMenuEntity(1L, 1L, "Nhiệm vụ công việc giao", "/VPCP/nhiemvucongviecduocgiao.zul", "aaaa","sdaad", 0, 0, 0));
              listResult.add(new SysMenuEntity(2L, 2L, "Nhiệm vụ công việc theo dõi", "/VPCP/nhiemvucongviectheodoi.zul", "aaaa","dssssdsd", 1, 1, 1));
              listResult.add(new SysMenuEntity(3L, 3L, "Tìm kiếm nhiệm vụ, công việc", "/VPCP/timkiemnhiemvu.zul", "aaaa","sdsds", 1, 1, 1));
              listResult.add(new SysMenuEntity(4L, 4L, "Văn bản phát hành chuyên viên", "/VPCP/vanbanphathanhchuyenvien.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(5L, 5L, "Báo cáo NV, CV theo dõi", "/VPCP/baocaonhiemvutheodoi.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(6L, 6L, "Báo cáo NV, CV giao", "/VPCP/baocaonhiemvuduocgiao.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(7L, 7L, "Báo cáo phân loại VBPH", "/VPCP/baocaophanloai.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(8L, 8L, "Nhiệm vụ được giao", "/VPCP/nhiemvuduocgiao.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(9L, 9L, "Nhiệm vụ quá hạn", "/VPCP/nhiemvuquahan.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(10L, 10L, "Nhiệm vụ đã hoàn thành", "/VPCP/nhiemvuhoanthanh.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(11L, 11L, "Nhiệm vụ, công việc phối hợp", "/VPCP/nhiemvucongviecphoihop.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(12L, 12L, "Báo cáo chi tiết", "/VPCP/baocaochitiet.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(13L, 13L, "Báo cáo thống kê", "/VPCP/baocaothongke.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(14L, 14L, "QL Lịch Họp Chờ LĐ", "test.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(15L, 15L, "Tìm kiếm lịch họp LĐ", "test.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(16L, 16L, "QL lịch họp tuần LĐ", "test.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(17L, 17L, "QL lịch họp chờ VPCP", "test.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(18L, 18L, "Tìm kiếm lịch họp VPCP", "test.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(19L, 19L, "QL lịch họp tuần VPCP", "test.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(20L, 20L, "Lịch công tác", "test.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(21L, 21L, "Thư đã nhận", "/QLT/thudanhan.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(22L, 22L, "Thư đã xóa", "/QLT/thudanhan.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(23L, 23L, "Thư đã gửi", "/QLT/thudanhan.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(24L, 24L, "Thư nháp", "/QLT/thudanhan.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(25L, 25L, "Mật khẩu", "/QLT/thietlapmatkhau.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(26L, 26L, "Nhóm người nhận", "/QLT/nhomnguoinhan.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(27L, 27L, "Quản lý thư mục", "/QLT/quanlythumuc.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(28L, 28L, "Chữ ký", "/QLT/chuky.zul", "aaaa","sadada", 0, 0, 0));
              listResult.add(new SysMenuEntity(29L, 29L, "Demo", "/VPCP/formVm.zul", "aaaa","sadada", 0, 0, 0));
              }

    public List<SysMenuEntity> getListSysMenu() {
//            HttpSession session = (HttpSession)
//                    (Executions.getCurrent()).getDesktop().getSession().getNativeSession();
//            System.out.println(session.getId());
//            CoreDataResponseEntity sysUserEntity =
//                    (CoreDataResponseEntity) Sessions.getCurrent().getAttribute(session.getId());
//            
//            CoreLibWebCommon libWebCommon = new CoreLibWebCommon();
//            Map<String, Object> params = new LinkedHashMap<>();
//            params.put("userName", "");
//            CoreDataResponseEntity coreDataResponseEntity
//                    = libWebCommon.requestDataToServer("SysMenu.getListMenu", params, sysUserEntity);
//            String strDataList =  coreDataResponseEntity.getData();
//
//            List<SysMenuEntity> listResult = (List<SysMenuEntity>) FunctionCommon.convertJsonToListObject(
//                   strDataList, SysMenuEntity.class);
//
//            
            return listResult;
    }
    public static void main(String[] args) {
        SysMenuController s=new SysMenuController();
        System.out.println(s.getListSysMenu());
    }
}
