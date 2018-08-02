/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.viettel.voffice.action.admin;

import com.viettel.voffice.controller.SysMenuController;
import com.viettel.voffice.entity.admin.SysMenuEntity;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import org.zkoss.bind.annotation.BindingParam;
import org.zkoss.bind.annotation.Command;
import org.zkoss.zk.ui.Component;
import org.zkoss.zk.ui.Executions;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zul.DefaultTreeModel;
import org.zkoss.zul.TreeModel;
import org.zkoss.zul.Window;

/**
 *
 * @author datnv5
 */
public class SysMenuAction extends SelectorComposer<Component> {

    @Command("selectedItem")
    public void selectnode(@BindingParam("selectId") int selectId) {
        Map args = new HashMap();
        args.put("myMap", "nguyen van dat");
        Window window = (Window) Executions.createComponents(
                "/pages/admin/windows/windows_editmenu.zul", null, args);
        window.setTitle(String.valueOf(selectId));
        window.doModal();
    }

    /**
     * lay du lieu danh muc nguoi dung
     * @return 
     */
    public TreeModel getTreeData() {
        SysMenuController sysMenuController = new SysMenuController();
        List<SysMenuEntity> listMenuData = sysMenuController.getListSysMenu();
        List<TreeNodeModel> listNodeTreeRoot = new ArrayList<>();
        for (SysMenuEntity lMenuEntity : listMenuData) {
            if(lMenuEntity.getParent_id() ==0){
                List<TreeNodeModel> listChildNode = getListNodeItem(
                        lMenuEntity.getId(),listMenuData);
                if(listChildNode!=null && listChildNode.size() >0){
                    TreeNodeModel[] array = listChildNode.toArray(new TreeNodeModel[listChildNode.size()]);
                    SysMenuEntity itemMenu = new SysMenuEntity(lMenuEntity.getId(),
                                lMenuEntity.getParent_id(),lMenuEntity.getName(),
                                lMenuEntity.getUrl_page_link(), lMenuEntity.getIconsclass(),"", 0, 0, 0);
                    listNodeTreeRoot.add(new TreeNodeModel(itemMenu,array, true));
                }else{
                    listNodeTreeRoot.add(new TreeNodeModel(
                        new SysMenuEntity(lMenuEntity.getId(),
                                lMenuEntity.getParent_id(),lMenuEntity.getName(),
                                lMenuEntity.getUrl_page_link(), lMenuEntity.getIconsclass(),"", 0, 0, 0)));
                }
        
            }
        }
        
        TreeModel _model ;
        TreeNodeModel[] array = listNodeTreeRoot.toArray(new TreeNodeModel[listNodeTreeRoot.size()]);
        TreeNodeModel root = new TreeNodeModel(null,
                array, true);
                _model = new DefaultTreeModel(root);
        return _model;
    }
    /**
     * de quy lay danh sach cay con cua danh muc
     * @param id
     * @param listMenuData
     * @return 
     */
    private List<TreeNodeModel> getListNodeItem(
            Long id, List<SysMenuEntity> listMenuData) {
        List<TreeNodeModel> listResult = new ArrayList<>();
        for (SysMenuEntity sysMenuEntity : listMenuData) {
            if(sysMenuEntity.getParent_id().equals(id)){
                List<TreeNodeModel> children = getListNodeItem(sysMenuEntity.getId(),listMenuData);
                if(children!=null && children.size() >0){
                    TreeNodeModel[] array = children.toArray(new TreeNodeModel[children.size()]);
                    TreeNodeModel deDirectoryTreeNode = new TreeNodeModel(sysMenuEntity, array, true);
                    listResult.add(deDirectoryTreeNode);
                }else{
                    TreeNodeModel deDirectoryTreeNode = new TreeNodeModel(sysMenuEntity);
                    listResult.add(deDirectoryTreeNode);
                }
            }
        }
        if(listResult.size() > 0){
            return listResult;
        }
        return null;
    }
}
