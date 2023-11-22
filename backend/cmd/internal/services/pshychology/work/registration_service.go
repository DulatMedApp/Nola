package service

import "github.com/DulatMedApp/Nola/backend/cmd/internal/models"

type RegistrationService struct {
}

func NewRegistrationService() *RegistrationService {
	return &RegistrationService{}
}

func (rs *RegistrationService) RegisterPsychologist(psychologist models.Psychologist) error {
	return nil
}
