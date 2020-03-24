use neon::prelude::*;

fn first(mut cx: FunctionContext) -> JsResult<JsString> {
    Ok(cx.string("first"))
}

register_module!(mut cx, {
    cx.export_function("first", first)
});
