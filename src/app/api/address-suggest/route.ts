import { NextResponse } from "next/server";

type DadataSuggestion = {
  value: string;
  data: {
    city: string | null;
    street_with_type: string | null;
    house_type: string | null;
    house: string | null;
  };
};

export async function POST(request: Request) {
  const { query } = await request.json();

  if (!query || typeof query !== "string" || query.trim().length < 3) {
    return NextResponse.json({ suggestions: [] });
  }

  const apiKey = process.env.DADATA_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ suggestions: [] });
  }

  const response = await fetch(
    "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Token ${apiKey}`,
      },
      body: JSON.stringify({
        query,
        count: 5,
        locations: [{ city: "Йошкар-Ола" }],
        restrict_value: true,
        from_bound: { value: "street" },
        to_bound: { value: "house" },
      }),
    },
  );

  if (!response.ok) {
    return NextResponse.json({ suggestions: [] });
  }

  const data = await response.json();
  const suggestions = (data.suggestions ?? []).map((s: DadataSuggestion) => {
    const { street_with_type, house_type, house } = s.data;
    if (street_with_type) {
      return house ? `${street_with_type}, ${house_type} ${house}` : street_with_type;
    }
    return s.value;
  });

  return NextResponse.json({ suggestions: [...new Set(suggestions)] });
}
