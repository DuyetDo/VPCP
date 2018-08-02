package com.viettel.voffice.action.components.navbar;

import com.viettel.voffice.controller.SysMenuController;
import com.viettel.voffice.entity.admin.SysMenuEntity;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.zkoss.bind.BindUtils;
import org.zkoss.bind.annotation.BindingParam;
import org.zkoss.bind.annotation.Command;
import org.zkoss.bind.annotation.Init;
import org.zkoss.zk.ui.select.SelectorComposer;
import org.zkoss.zul.ListModelList;
import org.zkoss.zul.Tabbox;

/**
 * danh muc menu va quan ly noi dung trang
 *
 * @author datnv5
 */
public class NavigationViewModel extends SelectorComposer {

    NavigationPage currentPage;
    private Map<Long, Map<Long, NavigationPage>> pageMap;
    List<SysMenuEntity> listMenuLevelOne;

    private ListModelList<TabInfo> tabInfos;
    private TabInfo selected;
    private int selectedIndex = 0;

    List<SysMenuEntity> listMenuData=new ArrayList<>();

    public List<SysMenuEntity> getListMenuData() {
        SysMenuController sysMenuController = new SysMenuController();
        listMenuData = sysMenuController.getListSysMenu();
        return listMenuData;
    }

    public void setListMenuData(List<SysMenuEntity> listMenuData) {
        this.listMenuData = listMenuData;
    }

    @Init
    public void init() {
        //get listmenu
        SysMenuController sysMenuController = new SysMenuController();
        listMenuData = sysMenuController.getListSysMenu();
        listMenuLevelOne = new ArrayList<>();
        if(listMenuData!=null && listMenuData.size() > 0){
            for (SysMenuEntity sysMenuEntity : listMenuData) {
//                if (sysMenuEntity.getParent_id().equals(0L)) {
                    listMenuLevelOne.add(sysMenuEntity);
//                }
            }
            initPageMap();
        }
        //add tasb
        tabInfos = new ListModelList<>();
    }

    @Command
    public void navigatePage(@BindingParam("target") NavigationPage targetPage) {
        BindUtils.postNotifyChange(null, null, currentPage, "selected");
        currentPage = targetPage;
        BindUtils.postNotifyChange(null, null, this, "currentPage");
    }

    public NavigationPage getCurrentPage() {
        return currentPage;
    }

    public Map<Long, Map<Long, NavigationPage>> getPageMap() {
        return pageMap;
    }

    private void initPageMap() {
        pageMap = new LinkedHashMap<>();
        SysMenuController sysMenuController = new SysMenuController();
        listMenuData = sysMenuController.getListSysMenu();
        for (SysMenuEntity sysMenuEntity : listMenuData) {
            if (sysMenuEntity.getParent_id()!=null && !sysMenuEntity.getParent_id().equals(0L)) {
                addPage(sysMenuEntity.getParent_id(), sysMenuEntity.getId(),
                        sysMenuEntity.getName(), sysMenuEntity.getUrl_page_link(),
                        sysMenuEntity.getIconsclass());
            }
        }

    }
    /**
     * add page dynamic from database
     * @param parent_id
     * @param id
     * @param title
     * @param url_page_link 
     */
    private void addPage(Long parent_id, Long id, String title, 
            String url_page_link, String iconsclass) {
        Map<Long, NavigationPage> subPageMap = pageMap.get(parent_id);
        if (subPageMap == null) {
            subPageMap = new LinkedHashMap<>();
            pageMap.put(parent_id, subPageMap);
        }
        NavigationPage navigationPage = new NavigationPage(parent_id, id, title,
                url_page_link, iconsclass) {
            @Override
            public boolean isSelected() {
                currentPage = this;
                return false;
            }
        };
        subPageMap.put(id, navigationPage);
    }

    /**
     * When click item menu
     *
     * @param idMenuSelect
     * @param tbox
     */
    @Command("menuItemSelect")
    public void menuItemSelect(
            @BindingParam("idMenuSelect") NavigationPage idMenuSelect,
            @BindingParam("tbox") Tabbox tbox) {
        TabInfo curentTab = new TabInfo(idMenuSelect.getId(),
                idMenuSelect.getTitle(), idMenuSelect.getUrl_page_link(),idMenuSelect.getIconsclass());
        boolean hasThisTab = false;
        for (int i = 0; i < tabInfos.size(); ++i) {
            TabInfo itemTabInfos = tabInfos.get(i);
            if (itemTabInfos.getId().equals(idMenuSelect.getId())) {
                //da mo tab nay
                hasThisTab = true;
                itemTabInfos.setSelected(true);
                tabInfos.get(i).setSelected(true);
                tabInfos.get(i).setIconsclass(idMenuSelect.getIconsclass());
                tbox.setSelectedIndex(i);
            } else {
                tabInfos.get(i).setSelected(false);
            }
        }
        curentTab.setSelected(true);
        if (!hasThisTab) {
            curentTab.setIndexTab(tabInfos.size());
            tabInfos.add(curentTab);
        }

    }

    @Command("closeTab")
    public void closeTab(@BindingParam("idTab")Long  idTab) {
        for (int i = 0; i < tabInfos.size(); i++) {
            if(tabInfos.get(i).getId().equals(idTab)){
               tabInfos.remove(i);
            }
        }
    }

    @Command("removeTab")
    public void onRemoveTab() {
        if (tabInfos.size() > 0) {
            tabInfos.remove(tabInfos.size() - 1);
        }
    }

    public List<SysMenuEntity> getListMenuLevelOne() {
        return listMenuLevelOne;
    }

    public void setListMenuLevelOne(List<SysMenuEntity> listMenuLevelOne) {
        this.listMenuLevelOne = listMenuLevelOne;
    }

    public List<TabInfo> getTabInfos() {
        return tabInfos;
    }

    public TabInfo getSelected() {
        return selected;
    }

    public void setSelected(TabInfo selected) {
        this.selected = selected;
    }

    public int getSelectedIndex() {
        return selectedIndex;
    }

    public void setSelectedIndex(int selectedIndex) {
        this.selectedIndex = selectedIndex;
    }

}
