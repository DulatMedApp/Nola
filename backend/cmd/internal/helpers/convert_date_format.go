package helpers

import (
	"errors"
	"strings"
)

// ConvertDateFormat преобразует дату из формата 'DD.MM.YYYY' в формат 'YYYY-MM-DD'
func ConvertDateFormat(dateStr string) (string, error) {
	parts := strings.Split(dateStr, ".")
	if len(parts) != 3 {
		return "", errors.New("Invalid date format")
	}
	return parts[2] + "-" + parts[1] + "-" + parts[0], nil
}
