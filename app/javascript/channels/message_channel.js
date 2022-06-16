import consumer from "./consumer"

const messageChannel = consumer.subscriptions.create("MessageChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    const messageDisplay = document.querySelector("#message-display")
    messageDisplay.insertAdjacentHTML("beforeend", this.template(data))
  },

  template(data) {
    return `<article>
              <p class="text-center font-bold">${data.user.email}</p>
              <p class="text-center">${data.message.body}</p>
            </article>`
  }
});

document.addEventListener("turbo:load", () => {
  let form = document.querySelector("#message-form")
  if (form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault()
      let messageInput = document.querySelector("#message-input").value
      if (messageInput === "") return;
      const message = {
        body: messageInput
      }
      messageChannel.send({ message: message })
    })
  }
})
