package middleware

import (
	"context"
	"fmt"
	"net/http"
	"strings"

	"github.com/DulatMedApp/Nola/backend/cmd/internal/helpers"
	"github.com/dgrijalva/jwt-go"
)

var jwtKey = []byte("JaTG86awhi69/ft38TnWJz4u78kaw0had6Ra9Po2TMfeoxfvhWKnE7FUdqMXrUAJHmv1F0S1flpQLwl2HPfUlg==")

func AuthMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		authHeader := r.Header.Get("Authorization")
		tokenString := strings.Split(authHeader, "Bearer ")[1]

		token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
			if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
				return nil, fmt.Errorf("unexpected signing method: %v", token.Header["alg"])
			}
			return jwtKey, nil
		})

		if err != nil || !token.Valid {
			helpers.RespondJSON(w, "Unauthorized", http.StatusUnauthorized)
			return
		}

		// Помещение информации о пользователе в контекст запроса
		ctx := context.WithValue(r.Context(), "user", token)
		r = r.WithContext(ctx)

		next.ServeHTTP(w, r)
	})
}
