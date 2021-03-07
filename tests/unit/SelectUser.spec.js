import { mount } from "@vue/test-utils";
import SelectUser from "@/components/SelectUser";

test("Show no error message on default", () => {
    const wrapper = mount(SelectUser);
    expect(wrapper.find(".error").isVisible()).toBe(false);
});
test("When a user does not exist, show an error", () => {
    const wrapper = mount(SelectUser);
    expect(wrapper.find(".error").isVisible()).toBe(true);
});