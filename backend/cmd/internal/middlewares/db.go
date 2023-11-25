// backend/internal/middleware/db.go

package middleware

import (
	"context"
	"net/http"

	config "github.com/DulatMedApp/Nola/backend/cmd/internal/db"
)

// DBMiddleware инициализирует соединение с базой данных и передает его обработчику
func DBMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		db, err := config.InitDB()
		if err != nil {
			http.Error(w, "Unable to connect to the database", http.StatusInternalServerError)
			return
		}
		defer db.Close()

		// Добавляем db в контекст запроса
		ctx := context.WithValue(r.Context(), "db", db)
		r = r.WithContext(ctx)

		// Продолжаем выполнение цепочки middleware и передаем управление следующему обработчику
		next.ServeHTTP(w, r)
	})
}
