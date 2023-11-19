# Используем стандартный образ golang
FROM golang:1.21.4

# Создаем рабочую директорию
WORKDIR /go/src/app

# Копируем файлы go.mod и go.sum и скачиваем зависимости
COPY go.mod go.sum ./
RUN go mod download

# Копируем остальные файлы проекта
COPY . .

# Собираем ваше приложение
RUN go build -o app ./backend/cmd/webserver/main.go

# Команда для запуска вашего приложения
CMD ["./app"]
