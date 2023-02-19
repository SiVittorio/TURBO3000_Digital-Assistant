import logging

from aiogram import html
from aiogram import Bot, Dispatcher, types
from aiogram.filters import Command
from aiogram.types import Message, InlineKeyboardButton, InlineKeyboardMarkup

from aiogram.utils.keyboard import InlineKeyboardBuilder


###!!!!
import psycopg2

def selectAll():
    cursor.execute('SELECT * FROM requests')
    requests = cursor.fetchall()
    print(requests)

def insertInto(idUser, userName, request):
    sql = 'INSERT INTO requests (id_Users, user_name, request) VALUES (' + str(idUser) + ', \'' + userName + '\'' + ', \'' + request + '\')'
    cursor.execute(sql)
    selectAll()

TOKEN = "6012029553:AAEjtjrNbGtdm0uaxslZceodYYHf4F_lXD0"
buttons_in_row = 2 # Количество кнопок в одной строке клавиатуры под сообщением


dp = Dispatcher()

logger = logging.getLogger(__name__)



@dp.message(Command(commands=["start"]))
async def command_start_handler(message: Message) -> None:
    builder = InlineKeyboardBuilder()

    builder.button(text="Где искать?", callback_data="where")
    builder.button(text="Не работает", callback_data="not_working")

    builder.adjust(3, 2)

    await message.answer(text=f"Задававай вопрос, {html.bold(html.quote(message.from_user.full_name))}!",
                         parse_mode="HTML", reply_markup=builder.as_markup())


@dp.callback_query()
async def where_callback(callback: types.CallbackQuery):
    await callback.message.answer("Не знаю я")


@dp.message()
async def echo_handler(message: types.Message) -> None:
    """
    Handler will forward received message back to the sender
    By default, message handler will handle all message types (like text, photo, sticker and etc.)
    """
    try:
        # Send copy of the received message
        await message.send_copy(chat_id=message.chat.id)
    except TypeError:
        # But not all the types is supported to be copied so need to handle it
        await message.answer("Чёто я не понял...")


def main() -> None:
    # Initialize Bot instance with an default parse mode which will be passed to all API calls
    bot = Bot(TOKEN, parse_mode="HTML")
    # And the run events dispatching
    dp.run_polling(bot)


if __name__ == "__main__":
    main()
