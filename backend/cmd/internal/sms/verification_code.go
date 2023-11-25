package sms

import (
	"math/rand"
)

const (
	codeLenth = 6
)

//GenerateVerificationCode

func GenerateVerificationCode() string {
	//rand.Seed(time.Now().UnixNano())

	codeRunes := []rune("0123456789")

	code := make([]rune, codeLenth)
	for i := range code {
		code[i] = codeRunes[rand.Intn(len(codeRunes))]
	}
	return string(code)
}
