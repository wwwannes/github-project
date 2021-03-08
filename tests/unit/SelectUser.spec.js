/*import { mount } from "@vue/test-utils";
import { useRouter } from "vue-router";

import SelectUser from "@/components/SelectUser";
import routes from "@/routes.js"


describe('SelectUser', () => {
    const router = useRouter();

    it("When a user does not exist, show an error", () => {
        const username = "thisShouldbeFailingHopefully6789";
        const wrapper = mount(SelectUser, {
            global: {
                plugins: [router],
                mocks: {
                    $route: {
                      params: { username }
                    }
                }
            }
        });
        expect(wrapper.find(".login__form__input").text()).toBe(username);
    });
    it("Succeedes when a user exists", () => {
        const username = "wwwannes";
        const wrapper = mount(SelectUser, {
            global: {
                plugins: [router],
                mocks: {
                    $route: {
                      params: { name: username }
                    }
                }
            }
        });
        expect(wrapper.find(".login__form__input").text()).toBe(username);
    });
});*/
