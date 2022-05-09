json.message nil
json.data do
  json.user_name @invoice.user_name
  json.user_lastname @invoice.user_lastname
  json.user_address @invoice.user_address
  json.user_phone @invoice.user_phone
  json.user_email @invoice.user_email
  json.user_siret @invoice.user_siret
  json.user_bic @invoice.user_bic
  json.user_bank @invoice.user_bank
  json.user_iban @invoice.user_iban
  json.user_vat @invoice.user_vat
  json.user_vat_number @invoice.user_vat_number
  json.client_project @invoice.client_project
  json.client_name @invoice.client_name
  json.client_btw @invoice.client_btw
  json.client_address @invoice.client_address
  json.client_email @invoice.client_email
end
