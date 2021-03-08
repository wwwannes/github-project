import { mount } from "@vue/test-utils";

import Home from "@/views/Home";
import { expect } from "chai";
import routes from "@/router/index.js";
import { createMemoryHistory, createRouter } from "vue-router";

describe("Home", () => {
  /*it("Get user info if user has been changed without using the input field at the start", () => {
        const wrapper = mount(Home, {
        });

        await wrapper.get
    });*/

  it("Have a list of repos", async () => {
    const router = createRouter({
      history: createMemoryHistory(),
      routes
    });
    router.push("/");
    const wrapper = mount(Home, {
      global: {
        plugins: [router]
      }
    });

    await wrapper.get(".repolist__item").setValue("New repo");
    expect(wrapper.findAll(".repolist__item")).toHaveLength(1);
  });
});
