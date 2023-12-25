package adminpanel

// import (
// 	"net/http"

// 	"github.com/GoAdminGroup/go-admin/engine"
// 	"github.com/GoAdminGroup/go-admin/examples/datamodel"
// 	"github.com/GoAdminGroup/go-admin/modules/config"
// 	"github.com/GoAdminGroup/go-admin/plugins/admin"
// 	"github.com/GoAdminGroup/go-admin/template"
// 	"github.com/GoAdminGroup/themes/adminlte"
// )

// // Инициализация административной панели
// func setupAdminPanel() http.Handler {
// 	r := http.NewServeMux()

// 	// Инициализация шаблона административной панели
// 	initializeTemplate()

// 	eng := engine.Default()

// 	// Конфигурация административной панели
// 	cfg := config.Config{
// 		// Настройте базу данных и другие параметры для административной панели
// 	}

// 	// Инициализация административной панели
// 	adminPlugin := admin.NewAdmin(datamodel.Generators)

// 	// Добавление административной панели в движок
// 	if err := eng.AddConfig(cfg).AddPlugins(adminPlugin).Use(r); err != nil {
// 		panic(err)
// 	}

// 	return r
// }

// // Функция инициализации шаблона административной панели
// func initializeTemplate() {
// 	template.AddComp(adminlte.NewTheme())
// }
