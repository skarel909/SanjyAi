import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface ChatRequest {
  message: string;
  model: string;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { message, model }: ChatRequest = await req.json();

    const responses: Record<string, string> = {
      "gpt-4":
        "This is a response from GPT-4. You asked about: " +
        message.substring(0, 50) +
        "... I'm ready to help with your questions!",
      "gpt-3.5":
        "This is a response from GPT-3.5. You asked about: " +
        message.substring(0, 50) +
        "... How can I assist you further?",
      claude:
        "This is a response from Claude. You asked about: " +
        message.substring(0, 50) +
        "... I'm here to help!",
    };

    const responseText =
      responses[model] ||
      "I'm Sanjy AI. You asked: " + message.substring(0, 30) + "...";

    return new Response(
      JSON.stringify({
        success: true,
        response: responseText,
        model: model,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error:", error);
    return new Response(
      JSON.stringify({
        success: false,
        error: "Failed to process request",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});
