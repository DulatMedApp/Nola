package sms

import (
	"fmt"
	"io/ioutil"
	"net/http"
	"net/url"

	config "github.com/DulatMedApp/Nola/backend/cmd/internal/configs"
)

func SendSMS(recipient, messageText string) (string, error) {
	apiURL := "https://api.mobizon.kz/service/message/sendsmsmessage"

	params := url.Values{}
	params.Set("apiKey", config.SMSApiKey)
	params.Set("recipient", recipient)
	params.Set("text", messageText)

	resp, err := http.PostForm(apiURL, params)
	if err != nil {
		return "", fmt.Errorf("failed to send request: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode != http.StatusOK {
		return "", fmt.Errorf("unexpected status code: %d", resp.StatusCode)
	}

	body, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		return "", fmt.Errorf("failed to read response body: %w", err)
	}

	response := string(body)
	return response, nil
}
