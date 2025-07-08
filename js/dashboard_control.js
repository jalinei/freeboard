(function () {
    // 🔍 Widget lookup
    function getWidgetByTitle(title) {
        return freeboardModel.panes()
            .flatMap(pane => pane.widgets())
            .find(widget => widget.settings().title === title);
    }

    // 🔍 Datasource lookup
    function getDatasourceByName(name) {
        return freeboardModel.datasources()
            .find(ds => ds.name() === name);
    }

    // 🔧 Global Dashboard Control API
    window.DashboardControl = {
        updateWidgetSetting(title, key, value) {
            const widget = getWidgetByTitle(title);
            if (widget && widget.settings()[key] !== undefined) {
                widget.settings()[key] = value;
                widget.widgetInstance.onSettingsChanged(widget.settings());
            }
        },

        updateDatasourceSetting(name, key, value) {
            const ds = getDatasourceByName(name);
            if (ds && ds.settings()[key] !== undefined) {
                ds.settings()[key] = value;
                ds.instance.onSettingsChanged(ds.settings());
            }
        }
    };
})();