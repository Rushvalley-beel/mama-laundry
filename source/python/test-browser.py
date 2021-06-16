from selenium import webdriver
driver = webdriver.Firefox(executable_path='node_modules/geckodriver')
url = "https://web.whatsapp.com/"
driver.get(url)
print(driver.current_url)
