package helpers

import (
	"fmt"
	"time"
)

func ScanTime(rawTime interface{}) (*time.Time, error) {
	if rawTime == nil {
		return nil, nil
	}

	timeString, ok := rawTime.([]byte)
	if !ok {
		return nil, fmt.Errorf("unexpected time format")
	}

	// Проверка на пустую строку
	if len(timeString) == 0 {
		return nil, nil
	}

	parsedTime, err := time.Parse("2006-01-02 15:04:05", string(timeString))
	if err != nil {
		return nil, err
	}

	return &parsedTime, nil
}
