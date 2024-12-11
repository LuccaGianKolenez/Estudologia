from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
import time

# Configure Selenium WebDriver
driver = webdriver.Chrome()  # Certifique-se de que o ChromeDriver está configurado corretamente

# Testes para a página

def test_switch_to_respostas_tab():
    """Teste para verificar a troca para a aba Respostas."""
    driver.get("http://localhost:3000")
    respostas_tab = driver.find_element(By.XPATH, "//button[contains(text(), 'Respostas')]")
    respostas_tab.click()
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//h3[contains(text(), 'Título da pergunta')]"))
    )
    print("Aba Respostas acessada com sucesso.")

def test_switch_to_questoes_tab():
    """Teste para verificar a troca para a aba Questões."""
    driver.get("http://localhost:3000")
    questoes_tab = driver.find_element(By.XPATH, "//button[contains(text(), 'Questões')]")
    questoes_tab.click()
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//div[contains(@class, 'grid-cols-1')]"))
    )
    print("Aba Questões acessada com sucesso.")

def test_filter_non_responded():
    """Teste para verificar o filtro de cadernos não respondidos."""
    driver.get("http://localhost:3000")
    checkbox = driver.find_element(By.XPATH, "//input[@type='checkbox']")
    checkbox.click()
    time.sleep(2)  # Esperar o filtro aplicar
    cards = driver.find_elements(By.XPATH, "//span[contains(text(), 'Não respondido')]")
    assert len(cards) > 0, "Nenhum caderno não respondido encontrado após aplicar o filtro."
    print("Filtro de cadernos não respondidos funcionando corretamente.")

def test_disable_respond_button():
    """Teste para verificar se o botão Responder está desabilitado para cadernos respondidos."""
    driver.get("http://localhost:3000")
    disabled_button = driver.find_element(By.XPATH, "//button[contains(@class, 'cursor-not-allowed')]")
    assert not disabled_button.is_enabled()
    print("Botão Responder desativado para cadernos respondidos.")

def test_enable_respond_button():
    """Teste para verificar se o botão Responder está habilitado para cadernos não respondidos."""
    driver.get("http://localhost:3000")
    enabled_button = driver.find_element(
        By.XPATH, "//button[not(contains(@class, 'cursor-not-allowed')) and contains(text(), 'Responder')]"
    )
    assert enabled_button.is_enabled()
    print("Botão Responder ativado para cadernos não respondidos.")

def test_navigation_to_caderno():
    """Teste para verificar a navegação para a página do caderno ao clicar em Responder."""
    driver.get("http://localhost:3000")
    enabled_button = driver.find_element(
        By.XPATH, "//button[not(contains(@class, 'cursor-not-allowed')) and contains(text(), 'Responder')]"
    )
    enabled_button.click()
    time.sleep(2)  # Ajustar para o tempo de navegação
    assert "/cadernos/" in driver.current_url
    print("Navegação para a página do caderno funcionando.")

def test_respostas_display():
    """Teste para verificar se as perguntas e respostas são exibidas corretamente na aba Respostas."""
    driver.get("http://localhost:3000")
    respostas_tab = driver.find_element(By.XPATH, "//button[contains(text(), 'Respostas')]")
    respostas_tab.click()
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//h3[contains(text(), 'Título da pergunta')]"))
    )
    perguntas = driver.find_elements(By.XPATH, "//h3[contains(text(), 'Título da pergunta')]")
    assert len(perguntas) > 0, "Nenhuma pergunta encontrada na aba Respostas."
    print("Perguntas e respostas exibidas corretamente na aba Respostas.")

def test_change_respostas_caderno():
    """Teste para verificar a troca entre diferentes cadernos na aba Respostas."""
    driver.get("http://localhost:3000")
    respostas_tab = driver.find_element(By.XPATH, "//button[contains(text(), 'Respostas')]")
    respostas_tab.click()
    caderno_button = driver.find_element(By.XPATH, "//button[contains(text(), 'Caderno de questões 2')]")
    caderno_button.click()
    WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, "//h3[contains(text(), 'Título da pergunta 3')]"))
    )
    print("Troca entre cadernos funcionando na aba Respostas.")

# Executar os testes
try:
    test_switch_to_respostas_tab()
    test_switch_to_questoes_tab()
    test_filter_non_responded()
    test_disable_respond_button()
    test_enable_respond_button()
    test_navigation_to_caderno()
    test_respostas_display()
    test_change_respostas_caderno()
finally:
    driver.quit()
